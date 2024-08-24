import { Request } from "express"
import { Document, Model, PopulateOptions, Query } from "mongoose"
import { IQuestion } from "../../interfaces/question"
import { IPagination } from "../../interfaces/query"

export function searchHelper<T extends Document, RT>(
  searchKey: string,
  query: Query<any, Document<unknown, any, T>, {}, any>,
  req: Request
) {
  if (req.query.search) {
    const searchObject: any = {}

    const titleRegex = new RegExp(req.query.search as string, "i")

    searchObject[searchKey] = titleRegex

    query = query.where(searchObject)
  }

  return query as RT
}

export function populateHelper<T extends Document, RT>(
  population: PopulateOptions | PopulateOptions[],
  query: Query<any, Document<unknown, any, T>, {}, any>
) {
  return query.populate(population) as RT
}

export function questionSortHelper<RT>(
  query: Query<any, Document<unknown, any, IQuestion>, {}, any>,
  req: Request
) {
  const sortKey = req.query.sortBy

  if (sortKey === "most-answered") {
    query = query.sort("-answerCount")
  } else if (sortKey === "most-liked") {
    query = query.sort("-likeCount")
  } else {
    query = query.sort("-createdAt")
  }

  return query as RT
}

export async function paginationHelper<T, RT>(
  total: number,
  query: Query<any, Document<unknown, any, T>, {}, any> | undefined,
  req: Request
) {
  const page = parseInt((req.query.page || "1") as string)
  const limit = parseInt((req.query.limit || "5") as string)
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const pagination: IPagination = {}

  if (startIndex > 0) {
    pagination.previous = {
      page: page - 1,
      limit,
    }
  }

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    }
  }

  return {
    query:
      query === undefined
        ? undefined
        : (query.skip(startIndex).limit(limit) as RT),
    pagination,
    startIndex,
    limit,
  }
}

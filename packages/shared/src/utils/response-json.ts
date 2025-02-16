import { responseCatch } from './response-catch'

export const responseJSON = async <T>(res: Response, options?: { transformBody: <R>(body: any) => Promise<R> | R }): Promise<T | unknown> => {
  return responseCatch(res)
    .then(async (response) => {
      if (typeof options !== 'undefined' && typeof options.transformBody !== 'undefined') {
        return response.json()
          .then(options.transformBody<T>)
      }

      // eslint-disable-next-line @masknet/type-prefer-return-type-annotation
      return response.json() as Promise<T>
    })
}

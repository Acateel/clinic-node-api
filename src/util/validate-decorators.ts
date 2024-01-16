import { validateOrReject } from 'class-validator'
import createHttpError from 'http-errors'
import StatusCode from 'status-code-enum'

export function validateDto(
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  let originalMethod = descriptor.value
  descriptor.value = async function (dto: Object) {
    try {
      await validateOrReject(dto)
      return originalMethod(dto)
    } catch (errors) {
      throw createHttpError(
        StatusCode.ClientErrorBadRequest,
        `Validation error: ${errors}`,
        errors
      )
    }
  }
}

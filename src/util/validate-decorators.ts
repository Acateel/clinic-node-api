import { validateOrReject } from 'class-validator'
import createHttpError from 'http-errors'
import StatusCode from 'status-code-enum'
import 'reflect-metadata'
const dtoMetadataKey = Symbol('validDto')

export function validDto(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  let existingDtoParameters: number[] =
    Reflect.getOwnMetadata(dtoMetadataKey, target, propertyKey) || []
  existingDtoParameters.push(parameterIndex)
  Reflect.defineMetadata(
    dtoMetadataKey,
    existingDtoParameters,
    target,
    propertyKey
  )
}

export function validateDto(
  target: Object,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  let method = descriptor.value!

  descriptor.value = async function () {
    try {
      let requiredParameters: number[] = Reflect.getOwnMetadata(
        dtoMetadataKey,
        target,
        propertyName
      )
      if (requiredParameters) {
        for (let parameterIndex of requiredParameters) {
          await validateOrReject(arguments[parameterIndex])
        }
      }
      return method.apply(this, arguments)
    } catch (errors) {
      throw createHttpError(
        StatusCode.ClientErrorBadRequest,
        `Validation error: ${errors}`,
        errors
      )
    }
  }
}

/**
 * Match email by regex, if email not match return null
 * @param email
 */
export const matchEmail = (email: string) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const emailMatches = regex.test(email)

  return emailMatches ? email : null
}

export class InvalidCheckInAfter20Minutes extends Error {
  constructor() {
    super('Invalid Check-in after twenty minutes of creation!')
  }
}

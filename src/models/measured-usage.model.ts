import { IsNotEmpty } from 'class-validator'
export class MeasuredUsage {
  @IsNotEmpty()
  measure: string

  @IsNotEmpty()
  quantity: number

  constructor(measure: string, quantity: number) {
    this.measure = measure
    this.quantity = quantity
  }

  toString(): string {
    return `MeasuredUsage{measure='${this.measure}', quantity='${this.quantity}'}`
  }
}

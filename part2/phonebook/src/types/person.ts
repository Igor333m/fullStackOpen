export interface Person {
  name: string
  id: string
  number: string
}

export interface NewPerson extends Omit<Person, 'id'> {}

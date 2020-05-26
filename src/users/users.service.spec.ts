import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { UserSchema } from './user.schema'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
      providers: [UsersService],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create User', async () => {
    const user = await service.create({
      email: 'info@test.it',
      password: '123',
    })
    expect(user).not.toBeNull()
    expect(user.email).toBeTruthy()
    expect(user.password).toBeTruthy()
  })

  it('should list Users', async () => {
    const users = await service.list()
    expect(users.length).toBe(1)
  })
})

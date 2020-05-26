import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { CreateUserDto } from './dto/create-user.dto'
import { UserSchema } from './user.schema'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService
  const userDto: CreateUserDto = { email: 'info@test.it', password: '123' }

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
    const user = await service.create(userDto)
    expect(user).not.toBeNull()
    expect(user.email).toEqual(userDto.email)
    expect(user.password).toEqual(userDto.password)
  })

  it('should list Users', async () => {
    const users = await service.list()
    expect(users.length).toBe(1)
  })

  it('should find User by email', async () => {
    const user = await service.findOneByEmail(userDto.email)
    expect(user.email).toBe(userDto.email)
  })
})

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

  describe('#create', () => {
    it('should not create User with falsy params', async () => {
      expect.assertions(4)
      try {
        await service.create(null)
      } catch (error) {
        error = error as Error
        expect(error.name).toEqual('ValidationError')
        expect(error.errors).not.toBeNull()
        expect(error.errors.email).not.toBeNull()
        expect(error.errors.password).not.toBeNull()
      }
    })

    it('should create User', async () => {
      const user = await service.create(userDto)
      expect(user).not.toBeNull()
      expect(user.email).toEqual(userDto.email)
      expect(user.password).toEqual(userDto.password)
    })
  })

  it('should list Users', async () => {
    const users = await service.list()
    expect(users.length).toBe(1)
  })

  it('should find User by email', async () => {
    const user = await service.findOneByEmail(userDto.email)
    expect(user).not.toBeNull()
    expect(user.email).toBe(userDto.email)
  })

  it('should delete User', async () => {
    const user = await service.findOneByEmail(userDto.email)
    expect(user).not.toBeNull()
    const res = await service.delete(user.id)
    expect(res.ok).toBe(1)
    expect(res.deletedCount).toBe(1)
  })
})

import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    await this.prismaService.event.create({
      data: {
        ...createEventDto,
        date: new Date(createEventDto.date),
      },
    });
  }

  async findAll() {
    return await this.prismaService.event.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.event.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    this.prismaService.event.update({
      where: {
        id,
      },
      data: updateEventDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.event.delete({
      where: {
        id,
      },
    });
  }
}

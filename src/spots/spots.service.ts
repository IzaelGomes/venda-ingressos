import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SpotsService {
  constructor(private prismaService: PrismaService) {}
  async create(createSpotDto: CreateSpotDto & { eventId: string }) {
    const event = await this.prismaService.event.findFirst({
      where: {
        id: createSpotDto.eventId,
      },
    });

    if (!event) throw new Error('Event not found');

    return this.prismaService.spot.create({
      data: {
        name: createSpotDto.name,
        eventId: createSpotDto.eventId,
        status: 'available',
      },
    });
  }

  findAll(eventId: string) {
    return this.prismaService.spot.findMany({
      where: {
        eventId,
      },
    });
  }

  findOne(eventId: string, id: string) {
    return this.prismaService.spot.findUnique({
      where: {
        eventId,
        id,
      },
    });
  }

  update(eventId: string, id: string, updateSpotDto: UpdateSpotDto) {
    this.prismaService.spot.update({
      where: {
        id,
        eventId,
      },
      data: updateSpotDto,
    });
  }

  remove(eventId: string, id: string) {
    this.prismaService.spot.delete({
      where: {
        id,
        eventId,
      },
    });
  }
}

import { Global, Module } from '@nestjs/common';
import { Awss3Service } from './awss3.service';

@Global()
@Module({
    providers: [Awss3Service],
    exports: [Awss3Service],
})
export class Awss3Module {}

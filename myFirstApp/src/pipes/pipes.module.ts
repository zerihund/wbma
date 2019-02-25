import { NgModule } from '@angular/core';
import { TnailPipe } from './tnail/tnail';
import { FiltersPipe } from './filters/filters';
import { DescriptionPipe } from './description/description';
@NgModule({
	declarations: [TnailPipe,
    FiltersPipe,
    DescriptionPipe],
	imports: [],
	exports: [TnailPipe,
    FiltersPipe,
    DescriptionPipe]
})
export class PipesModule {}

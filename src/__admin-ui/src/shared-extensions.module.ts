import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import SharedProviders_0_0 from './extensions/92aa7eafa53fed03241b9e8420384d94fa519ad8f9643a1003d2e69c3a17d771/providers';
import SharedProviders_1_0 from './extensions/subscription-feature-ui/providers';


@NgModule({
    imports: [CommonModule, ],
    providers: [...SharedProviders_0_0, ...SharedProviders_1_0],
})
export class SharedExtensionsModule {}

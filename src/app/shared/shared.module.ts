import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CityPipe } from "./pipes/city.pipe";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        CityPipe
    ],
    exports: [
        CityPipe,
        FormsModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: []
        }
    }

    static forChild(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: []
        }
    }
}
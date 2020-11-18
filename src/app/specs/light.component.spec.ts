import { Component, EventEmitter } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

@Component({
    selector: 'lightswitch-comp',
    template: `
      <button class="light-toggle" (click)="clicked()">Click me!</button>
      <span>{{message}}</span>`
})
export class LightswitchComponent {
    stateChanged$ = new EventEmitter<boolean>();
    isOn = false;
    clicked() {
        this.isOn = !this.isOn;
        this.stateChanged$.emit(this.isOn);
    }
    get message() { return `The light is ${this.isOn ? 'On' : 'Off'}`; }
}

describe('Isolate Testing vs Dom Testing', () => {

    describe('LightswitchComp', () => {
        it('#clicked() should toggle #isOn', () => {
            const comp = new LightswitchComponent();
            expect(comp.isOn).toBe(false, 'off at first');
            comp.clicked();
            expect(comp.isOn).toBe(true, 'on after click');
            comp.clicked();
            expect(comp.isOn).toBe(false, 'off after second click');
        });

        it('#clicked() should set #message to "is on"', () => {
            const comp = new LightswitchComponent();
            expect(comp.message).toMatch(/is off/i, 'off at first');
            comp.clicked();
            expect(comp.message).toMatch(/is on/i, 'on after clicked');
        });
    });

    describe('LightswitchComponent should render', () => {
        let component: LightswitchComponent;
        let fixture: ComponentFixture<LightswitchComponent>;
        let lightSwitchSpy;

        // Functions run in order
        beforeEach(async(
            () => {
                TestBed.configureTestingModule({
                    declarations: [
                        LightswitchComponent
                    ]
                }).compileComponents(); //  is asynchronous

                fixture = TestBed.createComponent(LightswitchComponent);
                component = fixture.componentInstance;

                lightSwitchSpy = spyOn(component, 'clicked').and.callThrough();
                fixture.detectChanges();
            }));

        it('should create', () => {
            expect(component).toBeDefined();
        });

        it('should contain "The light is Off"', () => {
            const lightElement: HTMLElement = fixture.nativeElement;
            expect(lightElement.getElementsByTagName('span')[0].textContent).toContain('The light is Off');
        });

        it('should contain "The light is On"', () => {
            const buttonDe = fixture.debugElement.query(By.css('.light-toggle'));
            buttonDe.triggerEventHandler('click', null);
            expect(lightSwitchSpy).toHaveBeenCalledTimes(1);

            fixture.detectChanges();

            const lightElement: HTMLElement = fixture.nativeElement;
            expect(lightElement.getElementsByTagName('span')[0].textContent).toContain('The light is On');
        });
    });

})
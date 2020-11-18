import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { async, fakeAsync, flush, TestBed, tick } from "@angular/core/testing";
import { By } from '@angular/platform-browser';
import { AppComponent } from "../app.component";

describe('Appcomponent', () => {
    const titleStr = 'Hello World!!';
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    }))

    it('should create an app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        expect(fixture).toBeDefined();
    })

    it('should have a title property', () => {
        const fixture = TestBed.createComponent(AppComponent);
        expect(fixture.componentInstance.title).toBeDefined();
        expect(fixture.componentInstance.title).toBe(titleStr);
    })

    it('should render the title', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        
        fixture.detectChanges();
        //tick();

        const header : DebugElement = fixture.debugElement.query(By.css('[data-ut="main-title"]'));
        expect((header.nativeElement as HTMLElement).innerText).toBe(titleStr);
    }))

    it('should render new title - async', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        
        const btn = fixture.debugElement.query(By.css('[data-ut="setBtn"'));

        btn.triggerEventHandler('click', null);
        
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const header : DebugElement = fixture.debugElement.query(By.css('[data-ut="main-title"]'));
            expect((header.nativeElement as HTMLElement).innerText).toBe('New Title');
        });
    }))

    it('should render new title fakeAsync', fakeAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
   
        const btn = fixture.debugElement.query(By.css('[data-ut="setBtn"'));

        btn.triggerEventHandler('click', null);
        
        tick(); // Without args resolves all microtasks (promises)
        // flush(); // Resolves all macrotasks like setTimeout, setInterval, requestAnimationFrame
      
        fixture.detectChanges();
        const header : DebugElement = fixture.debugElement.query(By.css('[data-ut="main-title"]'));
        expect((header.nativeElement as HTMLElement).innerText).toBe('New Title');
    }))
})
import { TestBed } from '@angular/core/testing';
import { Property } from './property.component';

describe('Property', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Property],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(Property);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'k-konsult-web' title`, () => {
    const fixture = TestBed.createComponent(Property);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('k-konsult-web');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(Property);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, k-konsult-web');
  });
});

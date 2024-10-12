import { TestBed } from '@angular/core/testing';
import { Inquery } from './inquery.component';

describe('Inquery', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inquery],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(Inquery);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'k-konsult-web' title`, () => {
    const fixture = TestBed.createComponent(Inquery);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('k-konsult-web');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(Inquery);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, k-konsult-web');
  });
});

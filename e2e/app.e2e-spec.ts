import { SimulacionTanquePage } from './app.po';

describe('simulacion-tanque App', function() {
  let page: SimulacionTanquePage;

  beforeEach(() => {
    page = new SimulacionTanquePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

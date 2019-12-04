import { discStore, DEFAULT_DISC_TYPES_TO_INCLUDE } from './DiscStore';
import { discService } from './DiscService';

describe('Disc Service', () => {


    it('should be defined', () => {
        expect(discService).toBeDefined();
    });

    it('add DiscType To Included Disc Filter should add passed in disc type to included disc types variable' , done => {
        
        discService.addDiscTypeToIncludedDiscFilter('Distance Driver');

        const discsToIncludeFilter = discStore._select(state => state.ui.discTypesToInclude);
        discsToIncludeFilter.subscribe(discs => {
            expect(discs.includes('Distance Driver')).toBe(true);
            expect(discs.length).toBe(5);
            done();
        })
    });

    it('remove DiscType To Included Disc Filter should remove passed in disk type from included disk type filter' , done => {
        
        
        discService.removeDiscTypeFromDiscToIncludeFilter('Distance Driver');

        const discsToIncludeFilter = discStore._select(state => state.ui.discTypesToInclude);

        discsToIncludeFilter.subscribe(discs => {
            expect(discs.length).toBe(3);
            expect(discs.includes('Distance Driver')).toBe(false);
           
            done();
        })
    });
});


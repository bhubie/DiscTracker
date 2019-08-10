import { discStore, DEFAULT_DISC_TYPES_TO_INCLUDE } from './DiscStore';

describe('Disc Store', () => {
    it('should be defined', () => {
        expect(discStore).toBeDefined();
    });

    it('discs should be any empty array by default', done => {
        const discs = discStore._select(state => state.discs);
        discs.subscribe(discs => {
            expect(discs).toEqual([]);
            done();
        })
    })

    it('discs to include filter should contain all disc types be default', done => {
        const discsToIncludeFilter = discStore._select(state => state.ui.discTypesToInclude);
        discsToIncludeFilter.subscribe(discs => {
            expect(discs).toBe(DEFAULT_DISC_TYPES_TO_INCLUDE);
            done();
        })
    })
});
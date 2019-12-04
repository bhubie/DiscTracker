import { DiscStore, discStore, DiscType, IDiscState, IDisc } from './DiscStore';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

export class DiscService {

    constructor(private discStore: DiscStore) {

    }

    fetchDiscs() {
        const url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;
        const apiURL = url === undefined ? '' : url;

        this.discStore.setLoading(true);

        return fromFetch(apiURL).pipe(
            switchMap(response => {
                return response.json();
            }),
        ).subscribe(response => {
            const discs = response.discs.map((disc: IDisc)  => Object.assign({ discWithManufacturer: `${disc.manufacturer} - ${disc.name}` }, disc));

            this.discStore.update((state: IDiscState) => ({
                discs
            }));

        });
    }

    addDiscTypeToIncludedDiscFilter(disc: DiscType) {

        this.discStore.update((state: IDiscState) => ({
            ui: {
                discTypesToInclude: [...state.ui.discTypesToInclude, disc]
            }
          }));
    }

    removeDiscTypeFromDiscToIncludeFilter(disc: DiscType) {
        this.discStore.update((state: IDiscState) => ({
            ui: {
                discTypesToInclude: [...state.ui.discTypesToInclude.filter(discType => discType !== disc)]
            }
          }));
    }

    setSelectedDiscID(id: string) {
        this.discStore.update((state: IDiscState) => ({
            selectedDiscId: id
        }));
    }

}

export const discService = new DiscService(discStore);

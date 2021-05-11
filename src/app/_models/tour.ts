import { Attraction } from './attraction';
import { Photo } from './photo';

export class Tour {
  tourId!: number;
  name!: string;
  summary!: string;
  duration!: string;
  locationId!: number;
  attractions!: Attraction[];
  photos!: Photo[];
  active!: boolean;

}

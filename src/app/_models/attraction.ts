import { Photo } from './photo';
import { Tour } from './tour';

export class Attraction {
  AttractionId!: number;
  name!: string;
  summary!: string;
  note!: string;
  rating!: number;
  locationId!: number;
  photos!: Photo[];
  tours!: Tour[];
  active!: boolean;
}

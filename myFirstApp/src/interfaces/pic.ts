import { Thumbnail } from 'ionic-angular';

export interface pic {
  file_id: string;
  filename: string;
  filesize: string;
  title:string;
  description:string;
  user_id:number;
  media_type:string;
  mime_type:string;
  time_added:string;
  thumbnails?:Thumbnail;

}
export interface Thumbnail {
  160:string;
  320 ?:string;
  640?:string;
}

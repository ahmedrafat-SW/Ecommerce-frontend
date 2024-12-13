import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NOTIFICATION} from '../config/AppConfig';
import {config} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

config = {
    timeOut: 5000,
    progressBar: true,
    closeButton: true,
  }
  constructor(private toast: ToastrService) { }


  notify(level : NOTIFICATION, title: string, message: string){
    if (level === NOTIFICATION.SUCCESS){
      this.toast.success(message, title, this.config);
    } else if(level === NOTIFICATION.INFO){
      this.toast.info(message, title, this.config);
    } else if(level === NOTIFICATION.WARN){
      this.toast.warning(message, title, this.config);
    }else if (level === NOTIFICATION.ERROR){
      this.toast.error(message, title, this.config);
    }
  }
}

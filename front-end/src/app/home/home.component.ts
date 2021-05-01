import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ItemsService } from './items.service';
import {
  NgbModalConfig,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
interface ItemI {
  id: number;
  name: string;
  user_id: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class HomeComponent implements OnInit {
  @Output() showItem = new EventEmitter();
  username: string | null | undefined = localStorage.getItem('user');
  items: any;
  closeResult = '';
  selectedItem!: ItemI;

  constructor(
    public authService: AuthService,
    public itemsService: ItemsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getItems();
  }

  async getItems() {
    await (await this.itemsService.getItems()).subscribe(
      (items) => {
        this.items = items;
        console.log(this.items);
      },
      (error) => console.log(error)
    );
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

  async open(content: any, itemId: string) {
    (await this.itemsService.getItemById(itemId)).subscribe((item: any) => {
      this.selectedItem = item;
      console.log(this.selectedItem);

      this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(
          (result) => {
            this.closeResult = `Cerrado con: ${result}`;
          },
          (reason) => {
            this.closeResult = `Cerrado por ${this.getDismissReason(reason)}`;
          }
        );
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'presionar ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'presionar fuera de modal';
    } else {
      return `${reason}`;
    }
  }
}

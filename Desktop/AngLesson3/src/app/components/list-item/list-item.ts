import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../../shared/item';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list-item.html',
  styleUrls: ['./list-item.css'],
})
export class ListItem {
 listItems: Item[] = [
    new Item('1', 'Item 1'),
    new Item(undefined, 'Item 2'),
    new Item('3', 'Item 3'),
    new Item(undefined, 'Item 4'),
    new Item('5', 'Item 5'),
  ];
}

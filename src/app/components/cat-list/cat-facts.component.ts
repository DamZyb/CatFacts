import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {CatFactService} from './cat-list.service';
import {CatFactComponent} from '../cat-fact/cat-fact.component';
import {CatFact} from './cat-fact';
import {JsonPipe} from '@angular/common';
import {from, map, mergeMap} from 'rxjs';

@Component({
  selector: 'app-cat-list',
  standalone: true,
  imports: [
    CatFactComponent,
    JsonPipe
  ],
  templateUrl: './cat-facts.component.html',
  styleUrl: './cat-facts.component.scss'
})
export class CatFactsComponent implements OnDestroy, OnInit, AfterViewInit {
  public title: string = 'Interesting facts about cats'
  public data: WritableSignal<Set<CatFact>> = signal(new Set())
  @ViewChild('anchor') anchor!: ElementRef
  private observer?: IntersectionObserver;
  isFirstLoad: boolean = true;

  constructor(private catFactService: CatFactService) {
  }

  ngOnInit(): void {
    this.loadData();

    setTimeout(() => {
      this.isFirstLoad = false;
    }, 1000)
  }

  ngAfterViewInit(): void {
    this.initializeObserver(this.anchor)
  }

  private loadData() {
    this.catFactService.getText().pipe(mergeMap(facts => from(facts.data)), map(value => {
      return {quote: value} as CatFact
    })).subscribe((data: CatFact) => {
      let currentData = this.data()
      currentData.add(data)
      this.data.set(currentData);

    })
  }

  private initializeObserver(anchor: ElementRef<HTMLElement>): void {
    if (anchor) {
      this.observer?.disconnect();
      this.observer = new IntersectionObserver(([entry]): void => {
        if (entry.isIntersecting) {
          if (!this.isFirstLoad) {

            this.loadData()
          }
        }
      }, {threshold: 1});

      this.observer.observe(anchor.nativeElement);

    }
  }

  public ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}


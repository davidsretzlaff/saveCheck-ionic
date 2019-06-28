import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: '../about/about.module#AboutPageModule'
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: ':scan',
            loadChildren: '../search/search.module#SearchPageModule'
          }
        ]
      },
      {
        path: 'component',
        children: [
          {
            path: '',
            loadChildren: '../component/component.module#ComponentPageModule'
          }
        ]
      },
      {
        path: 'likes',
        children: [
          {
            path: '',
            loadChildren: '../likes/likes.module#LikesPageModule'
          }
        ]
      },
      {
        path: 'detail',
        children: [
          {
            path: '',
            loadChildren: '../detail/detail.module#DetailPageModule'
          }
        ]
      },
      {
        path: 'new-product',
        children: [
          {
            path: '',
            loadChildren: '../new-product/new-product.module#NewProductPageModule'
          }
        ]
      },
      
      
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/search/0',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

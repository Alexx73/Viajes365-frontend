import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatEditorComponent } from './chat-editor.component';
import { ChatsListComponent } from './chats-list.component';

const routes: Routes = [
    { path: '', component: ChatsListComponent },
    { path: 'chatslist', component: ChatsListComponent, pathMatch: 'full' },
    {
        path: 'chat-editor/:id',
        component: ChatEditorComponent,
        pathMatch: 'full',
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChatsRoutingModule { }
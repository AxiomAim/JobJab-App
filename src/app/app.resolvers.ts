import { inject } from '@angular/core';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { MessagesService } from 'app/layout/common/messages/messages.service';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';
import { QuickChatService } from 'app/layout/common/quick-chat/quick-chat.service';
import { ShortcutsService } from 'app/layout/common/shortcuts/shortcuts.service';
import { forkJoin } from 'rxjs';
// import { FirebaseAuthV2Service } from './core/auth-firebase/firebase-auth-v2.service';
import { StagesV2Service } from './core/services/data-services/stages/stages-v2.service';

export const initialDataResolver = () => {
    // const _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    const messagesService = inject(MessagesService);
    const navigationService = inject(NavigationService);
    const notificationsService = inject(NotificationsService);
    const quickChatService = inject(QuickChatService);
    const shortcutsService = inject(ShortcutsService);
    const _stagesV2Service = inject(StagesV2Service);

    // Fork join multiple API endpoint calls to wait all of them to finish
    return forkJoin([
        // _firebaseAuthV2Service.initiate(),
        navigationService.get(),
        messagesService.getAll(),
        notificationsService.getAll(),
        quickChatService.getChats(),
        shortcutsService.getAll(),
        _stagesV2Service.getAll(),
    ]);
};

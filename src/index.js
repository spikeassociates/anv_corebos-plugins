import React from 'react';
import PostMessageAttachment from './PostMessageAttachment';
import { changeRoute } from 'utils';

class coreBOSPlugin {
  handleWebSocketEvent(payload) {
    const { data } = payload;
    const { action, module, id } = data;

    if (action === 'list') {
      changeRoute({ view: 'list', moduleName: module });
    } else if (action === 'create') {
      changeRoute({ view: 'create', moduleName: module });
    } else if (action === 'edit') {
      changeRoute({ view: 'edit', moduleName: module, id });
    } else if (action === 'open') {
      changeRoute({ view: 'detail', moduleName: module, id });
    }
  }

  handleSeeAction = postId => {
    const { chatwithme = {} } = this.store.getState().entities.posts.posts[postId].props;
    const { module, id } = chatwithme;

    changeRoute({ view: 'detail', moduleName: module, id });
  };

  filterSeeAction = postId => {
    const { chatwithme = {} } = this.store.getState().entities.posts.posts[postId].props;
    const { action } = chatwithme;

    return action === 'see';
  };

  initialize(registry, store) {
    window.changeRoute = changeRoute;
    this.store = store;

    registry.registerPostMessageAttachmentComponent(PostMessageAttachment);
    registry.registerWebSocketEventHandler('custom_com.corebos.server_corebos', this.handleWebSocketEvent);
    registry.registerPostDropdownMenuAction('Open Details', this.handleSeeAction, this.filterSeeAction);
  }
}

window.registerPlugin('com.corebos.plugins', new coreBOSPlugin());

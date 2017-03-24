(function (window) {

  // our store
  const store = {
    DB: 'ecthienders_blog',
    save: function (data) {
      window.localStorage.setItem(this.DB, JSON.stringify({
        content: data,
        timestamp: Date.now()
      }))
    },
    load: function() {
      const data = JSON.parse(window.localStorage.getItem(this.DB));
      return (data && data.content) || ''; 
    }
  };

  // show subtle notifications sometimes
  function notify(notification) {
    const elem = document.querySelector('.article > h2');
    const notif = document.createElement('div');
    notif.innerText = notification;
    notif.className = 'notification';
    elem.appendChild(notif);
    setTimeout(function() {
      notif.remove();
    }, 1200);
  }

  function showDistractions() {
  }

  function hideDistractions() {
  }

  const editArea = document.getElementById('edit-area');
  const existingContent = store.load();

  if (existingContent) {
    editArea.innerText = existingContent;
  }

  editArea.addEventListener('blur', function() {
    notify('Saving...');
    store.save(editArea.innerText);
    showDistractions();
  })

  editArea.addEventListener('focus', function() {
    hideDistractions();
  })

  // auto-save every 1 min
  const intervalId = setInterval(function () {
    notify('Saving...');
    store.save(editArea.innerText);
  }, 1000 * 60);

})(window);

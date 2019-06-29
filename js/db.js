var dbPromised = idb.open("idb-news", 1, function(upgradeDb) {
    var newsObjectStore = upgradeDb.createObjectStore("news", {keyPath: "ID"});
    newsObjectStore.createIndex("post_title", "post_title",{unique: false});
});

function saveOffline(article) {
    dbPromised
    .then(function(db) {
        var tx = db.transaction("news", "readwrite");
        var store = tx.objectStore("news");
        console.log(article);
        store.add(article.result);
        return tx.complete;
    })
    .then(function() {
        console.log("Berhasil menyimpan berita.");
    });
}

function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            var tx = db.transaction("news", "readonly");
            var store = tx.objectStore("news");
            return store.getAll();
        })
        .then(function(articles) {
            resolve(articles);
        });
    });
}

function getById(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            var tx = db.transaction("news", "readonly");
            var store = tx.objectStore("news");
            return store.get(id);
        })
        .then(function(article) {
            resolve(article);
        });
    });
}
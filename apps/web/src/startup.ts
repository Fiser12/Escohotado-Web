import { videoMock } from './lib/domain/cms/video-content-cms.js';
import { videoCmsUpsert } from './lib/server/cms/video/video-cms-upsert.js';
import { syncProducts } from './lib/server/stripe/products/sync_products.js';

await syncProducts();

/*
//make a for from 1 to 100 to create 100 videos
for (let i = 0; i < 100; i++) {
    await videoCmsUpsert(videoMock(`${i}`));
}
    */



[undefined, null, 1].mapNotNull((x) => x) // [1]
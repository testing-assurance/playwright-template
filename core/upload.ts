import results from '../results.json';
import { FailedTests, Spec } from './types';
import { getIdFromTitle } from './utils';
import { put } from '@vercel/blob';
import fs from 'fs';
import hbjs from 'handbrake-js';

const projectId = process.argv[2];

type Suites = (typeof results)['suites'];

function generateItemBySpec(spec: Spec): FailedTests {
  return {
    testId: getIdFromTitle(spec.title),
    environment: spec.tests[0].projectId,
    videoLocation: spec.tests[0].results[0].attachments.find((item) => item.name === 'video')?.path || null,
  };
}

function getList(suites: Suites): FailedTests[] {
  let failedTests: FailedTests[] = [];

  suites.forEach((suite) => {
    suite.suites.forEach((_suite) => {
      _suite.specs.forEach((spec) => {
        if (spec.ok) {
          return;
        }
        failedTests.push(generateItemBySpec(spec));
      });
    });
  });

  return failedTests;
}

function convertToM4V(videoLocation: string): { outputUrl: string } {
  const output = videoLocation.replace('.webm', '.m4v');
  hbjs
    .spawn({ input: videoLocation, output: output })
    .on('error', (err) => {
      // invalid user input, no video found etc
      console.log('Error converting video:', err);
    })
    .on('end', () => {
      console.log('Video conversion completed...');
    });
  return { outputUrl: output };
}

const list = getList(results.suites);

function uploadVideos(list: ReturnType<typeof getList>) {
  list.forEach(async (item) => {
    if (item.videoLocation) {
      const videoBuffer = fs.readFileSync(item.videoLocation);
      const { outputUrl } = convertToM4V(item.videoLocation);
      // do it one by one instead of doing it in the loop to prevent potential upload errors
      put(outputUrl, videoBuffer, {
        access: 'public',
        token: 'vercel_blob_rw_Xp8sfOuFASN7ZePB_dmu8W8LS3LJ8mIXh9fYeaVdHYuxMHE',
        addRandomSuffix: false,
      });
    }
  });
}

uploadVideos(list);

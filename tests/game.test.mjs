import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveShot,clampAim} from '../src/game.js';
test('shots beyond either post miss regardless of goalie position',()=>{assert.equal(resolveShot(-1.2,0),'wide');assert.equal(resolveShot(1.2,.6),'wide');});
test('the goalie saves a puck in its reach',()=>{assert.equal(resolveShot(.3,.2),'saved');assert.equal(resolveShot(-.3,-.2),'saved');});
test('an on-target shot outside goalie reach scores',()=>{assert.equal(resolveShot(.7,-.6),'goal');assert.equal(resolveShot(-.7,.6),'goal');});
test('aim input stays finite and within the rink',()=>{assert.equal(clampAim(4),1.5);assert.equal(clampAim(-4),-1.5);assert.equal(clampAim('bad'),0);assert.equal(clampAim(.55),.55);});

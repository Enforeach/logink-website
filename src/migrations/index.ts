import * as migration_20260705_040236_initial from './20260705_040236_initial';
import * as migration_20260705_055637_relax_casestudy_legacy from './20260705_055637_relax_casestudy_legacy';
import * as migration_20260715_135759_client_logos from './20260715_135759_client_logos';
import * as migration_20260716_055212_post_markdown_body from './20260716_055212_post_markdown_body';

export const migrations = [
  {
    up: migration_20260705_040236_initial.up,
    down: migration_20260705_040236_initial.down,
    name: '20260705_040236_initial',
  },
  {
    up: migration_20260705_055637_relax_casestudy_legacy.up,
    down: migration_20260705_055637_relax_casestudy_legacy.down,
    name: '20260705_055637_relax_casestudy_legacy',
  },
  {
    up: migration_20260715_135759_client_logos.up,
    down: migration_20260715_135759_client_logos.down,
    name: '20260715_135759_client_logos',
  },
  {
    up: migration_20260716_055212_post_markdown_body.up,
    down: migration_20260716_055212_post_markdown_body.down,
    name: '20260716_055212_post_markdown_body'
  },
];

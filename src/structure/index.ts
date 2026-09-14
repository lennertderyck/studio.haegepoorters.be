import {StructureResolver} from 'sanity/structure'
import {ContentTree} from '../components/ContentTree/ContentTree'
import {RenderIcon} from '../components/Icon/Icon.utils'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Studio')
    .items([
      S.listItem()
        .title('Content')
        .icon(RenderIcon('folder-2-line'))
        .child(S.component().component(ContentTree).title('Content')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['content'].includes(listItem.getId() || ''),
      ),
    ])

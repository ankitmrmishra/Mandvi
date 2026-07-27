import {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blogs')
    .items([
      // ⚙️ Site Settings Singleton
      S.listItem()
        .title('Global Site Settings')
        .icon(() => '⚙️')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Global Site Settings'),
        ),

      S.divider(),

      // 📝 Content - SIMPLIFIED: Only Blog Posts
      S.listItem()
        .title('Content')
        .icon(() => '📝')
        .child(
          S.list()
            .title('Academic Content')
            .items([
              S.listItem()
                .title('Blog Posts')
                .icon(() => '✍️')
                .child(S.documentTypeList('post').title('Blog Posts')),
              // All other content types removed - use Blog Posts with Categories instead:
              // - Essays → Blog Post with "Essay" category
              // - Book Reviews → Blog Post with "Book Review" category
              // - Research → Blog Post with "Research" category
            ]),
        ),

      // 👥 People Group
      S.listItem()
        .title('People')
        .icon(() => '👥')
        .child(
          S.list()
            .title('People & Profiles')
            .items([
              S.listItem()
                .title('Authors / Profiles')
                .icon(() => '👤')
                .child(S.documentTypeList('author').title('Authors / Profiles')),
            ]),
        ),

      // 🏷️ Taxonomy Group
      S.listItem()
        .title('Taxonomy')
        .icon(() => '🏷️')
        .child(
          S.list()
            .title('Tags & Categories')
            .items([
              S.listItem()
                .title('Categories')
                .icon(() => '📁')
                .child(S.documentTypeList('category').title('Categories')),
              S.listItem()
                .title('Tags')
                .icon(() => '🏷️')
                .child(S.documentTypeList('tag').title('Tags')),
            ]),
        ),

      // Filter out auto-generated lists for schemas we already display in the custom structure
      ...S.documentTypeListItems().filter(
        (item) =>
          !['siteSettings', 'post', 'author', 'category', 'tag'].includes(item.getId() || ''),
      ),
    ])

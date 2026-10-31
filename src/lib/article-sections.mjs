function wrapTable(node) {
  return node.type === 'element' && node.tagName === 'table'
    ? {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-scroll'] },
        children: [node],
      }
    : node;
}

export default function articleSections() {
  return {
    name: 'article-sections',
    before(root, ctx) {
      const path = ctx.fileURL?.pathname ?? '';
      if (!path.includes('/content/blog/')) return;

      const children = [];
      let section = null;

      for (const node of root.children) {
        if (node.type === 'element' && node.tagName === 'h2') {
          section = {
            type: 'element',
            tagName: 'section',
            properties: { className: ['article-section'] },
            children: [node],
          };
          children.push(section);
          continue;
        }
        const child = wrapTable(node);
        if (section) section.children.push(child);
        else children.push(child);
      }

      ctx.replaceNode(root, { type: 'root', children });
    },
  };
}

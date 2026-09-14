import {Box, Card, Flex, Stack, Text} from '@sanity/ui'
import {useEffect, useState} from 'react'
import {useClient} from 'sanity'
import {useRouter} from 'sanity/router'
import Icon from '../Icon/Icon'

interface ContentItem {
  _id: string
  title: string
  isFolder: boolean
  parent?: {_ref: string}
}

export function ContentTree() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
  const [folderPath, setFolderPath] = useState<Array<{id: string; title: string}>>([])
  const client = useClient({apiVersion: '2023-01-01'})
  const router = useRouter()

  useEffect(() => {
    const query = currentFolderId
      ? '*[_type == "content" && parent._ref == $parentId] | order(isFolder desc, title asc)'
      : '*[_type == "content" && !defined(parent)] | order(isFolder desc, title asc)'

    const params = currentFolderId ? {parentId: currentFolderId} : {}

    client.fetch<ContentItem[]>(query, params).then(setItems)
  }, [currentFolderId, client])

  const handleItemClick = (item: ContentItem) => {
    if (item.isFolder) {
      setCurrentFolderId(item._id)
      setFolderPath([...folderPath, {id: item._id, title: item.title}])
    } else {
      // Navigate to the document editor
      router.navigateIntent('edit', {
        id: item._id,
        type: 'content',
      })
    }
  }

  const navigateToFolder = (folderId: string | null, index?: number) => {
    setCurrentFolderId(folderId)
    if (index !== undefined) {
      setFolderPath(folderPath.slice(0, index))
    } else {
      setFolderPath([])
    }
  }

  const editFolder = (folderId: string) => {
    router.navigateIntent('edit', {
      id: folderId,
      type: 'content',
    })
  }

  return (
    <Stack space={3} padding={4}>
      {/* Breadcrumb navigation */}
      <Card padding={3} border>
        <Flex align="center" gap={2}>
          <Text
            size={1}
            weight="semibold"
            style={{cursor: 'pointer', color: currentFolderId ? 'inherit' : '#2276FC'}}
            onClick={() => navigateToFolder(null)}
          >
            Content
          </Text>
          {folderPath.map((folder, index) => (
            <Flex key={folder.id} align="center" gap={2}>
              <Text size={1}>/</Text>
              <Text
                size={1}
                weight="semibold"
                style={{
                  cursor: 'pointer',
                  color: index === folderPath.length - 1 ? '#2276FC' : 'inherit',
                }}
                onClick={() => navigateToFolder(folder.id, index + 1)}
              >
                {folder.title}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Card>

      {/* Current folder edit button */}
      {currentFolderId && (
        <Card
          padding={3}
          tone="primary"
          style={{cursor: 'pointer'}}
          onClick={() => editFolder(currentFolderId)}
        >
          <Text size={1} weight="medium">
            ✏️ Edit this folder
          </Text>
        </Card>
      )}

      {/* Items list */}
      <Stack space={1}>
        {items.map((item) => (
          <Card
            key={item._id}
            padding={3}
            radius={2}
            shadow={1}
            style={{cursor: 'pointer', transition: 'all 0.2s'}}
            onClick={() => handleItemClick(item)}
          >
            <Flex align="center" gap={3}>
              <Box>
                <Icon name={item.isFolder ? 'folder-2-line' : 'file-text-line'} />
              </Box>
              <Text size={2} weight={item.isFolder ? 'semibold' : 'regular'}>
                {item.title}
              </Text>
            </Flex>
          </Card>
        ))}
        {items.length === 0 && (
          <Card padding={4} tone="transparent">
            <Text size={1} muted>
              No items in this folder. Use the menu above to create new content.
            </Text>
          </Card>
        )}
      </Stack>
    </Stack>
  )
}

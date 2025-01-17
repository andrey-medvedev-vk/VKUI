## Цифровая доступность (a11y)

- Рекомендуется использовать тег `"li"` для повышения доступности компонента. Вы можете прокинуть необходимый тег через prop `Component`.
  Ссылки на источники: [статья про доступность карточек](https://inclusive-components.design/cards/).
  > **Важно**
  >
  > В v7 тег по умолчанию будет заменен на `"li"`

```jsx
<View activePanel="card">
  <Panel id="card">
    <PanelHeader>Card</PanelHeader>
    <Group>
      <Group mode="plain" header={<Header mode="secondary">Дефолтный стиль</Header>}>
        <CardGrid size="l">
          <Card>
            <div style={{ height: 96 }} />
          </Card>
        </CardGrid>
      </Group>
      <Group mode="plain" header={<Header mode="secondary">С внутренней обводкой</Header>}>
        <CardGrid size="l">
          <Card mode="outline">
            <div style={{ height: 96 }} />
          </Card>
        </CardGrid>
      </Group>
      <Group mode="plain" header={<Header mode="secondary">С внешней тенью</Header>}>
        <CardGrid size="l">
          <Card mode="shadow">
            <div style={{ height: 96 }} />
          </Card>
        </CardGrid>
      </Group>
      <Group
        mode="plain"
        header={<Header mode="secondary">С внутренней обводкой и дефолтным фоном</Header>}
      >
        <CardGrid size="l">
          <Card mode="outline-tint">
            <div style={{ height: 96 }} />
          </Card>
        </CardGrid>
      </Group>
    </Group>
  </Panel>
</View>
```

Горизонтальный скролл для [Card](#!/Card).

Согласно дизайну, высота `Card` должна масштабироваться относительно её ширины. В примерах это достигается с помощью процентного `padding-bottom`. Пропорции следующие:

- `size="s"`: высота равна 66% ширины;
- `size="m"`: высота равна 42% ширины;
- `size="l"`: высота равна 29% ширины.

## Цифровая доступность (a11y)

- Рекомендуется использовать тег `"ul"` для повышения доступности компонента. Вы можете прокинуть необходимый тег через prop `Component`.
  Ссылки на источники: [статья про доступность карточек](https://inclusive-components.design/cards/).
  > **Важно**
  >
  > В v7 тег по умолчанию будет заменен на `"ul"`

```jsx
<View activePanel="card">
  <Panel id="card">
    <PanelHeader>CardScroll</PanelHeader>
    <Group description="Внутри Group">
      <CardScroll size="s">
        <Card>
          <div style={{ paddingBottom: '66%' }} />
        </Card>
        <Card>
          <div style={{ paddingBottom: '66%' }} />
        </Card>
        <Card>
          <div style={{ paddingBottom: '66%' }} />
        </Card>
        <Card>
          <div style={{ paddingBottom: '66%' }} />
        </Card>
        <Card>
          <div style={{ paddingBottom: '66%' }} />
        </Card>
        <Card>
          <div style={{ paddingBottom: '66%' }} />
        </Card>
      </CardScroll>
    </Group>
    <CardScroll size="m">
      <Card>
        <div style={{ paddingBottom: '42%' }} />
      </Card>
      <Card>
        <div style={{ paddingBottom: '42%' }} />
      </Card>
      <Card>
        <div style={{ paddingBottom: '42%' }} />
      </Card>
      <Card>
        <div style={{ paddingBottom: '42%' }} />
      </Card>
    </CardScroll>
    <CardScroll size="l">
      <Card>
        <div style={{ paddingBottom: '29%' }} />
      </Card>
      <Card>
        <div style={{ paddingBottom: '29%' }} />
      </Card>
      <Card>
        <div style={{ paddingBottom: '29%' }} />
      </Card>
    </CardScroll>
  </Panel>
</View>
```

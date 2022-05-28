<template>
  <div class="custom-tree-container">
    <p>Using scoped slot</p>
    <ElTree
      :data="dataSource"
      node-key="id"
      :icon="ArrowRightBold"
      :default-expand-all="true"
      :highlight-current="true"
      :props="{
        class: setClass
      }"
    >
      <template #default="{ node, data }">
        <div v-if="node.label" class="custom-tree-node">
          <span>{{ node.label }}</span>
          <div @click.stop @mousedown.stop>
            <span @click.stop="append(data)">add </span>
            <span @click.stop="remove(node, data)">del</span>
          </div>
        </div>
        <ElInput v-model="input" @keyup.enter="sure(data)" v-else />
      </template>
    </ElTree>
    <ElInput v-if="show" v-model="rootInput" @keyup.enter="addTreeRoot" />
    <ElButton @click="addTree">新增</ElButton>
  </div>
</template>


<script lang="ts" setup>
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ElTree, ElInput, ElButton } from 'element-plus';
import { ArrowRightBold } from '@element-plus/icons-vue';

const input = ref('')
const rootInput = ref('');
const show = ref(false);

interface Tree {
  id: number
  label: string
  children?: Tree[]
}
let id = 1000

const append = (data: Tree) => {
  const newChild = { id: id++, label: '', children: [] }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
  dataSource.value = [...dataSource.value]
}

const remove = (node: Node, data: Tree) => {
  const parent = node.parent
  const children: Tree[] = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
  dataSource.value = [...dataSource.value]
}

const setClass = (data: any, node: Node) => {
  return 'pixso-tree-node';
}

const sure = (data) => {
  data.label = input.value;
  dataSource.value = [...dataSource.value]
  input.value= ''
}

const addTree = () => {
  show.value = true;
}

const addTreeRoot = () => {
  dataSource.value.push({
    id: id++,
    label: rootInput.value
  })
  show.value = false
  console.log('bbbbbbbbbbbbbbb')
}

const dataSource = ref<Tree[]>([
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
])
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  height: 40px;
}
</style>
<style>
.pixso-tree-node .el-tree-node__content {
  height: auto !important;

}
</style>







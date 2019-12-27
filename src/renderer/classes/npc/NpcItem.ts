// Wrapper class for items assigned to an NPC

import { NpcFeature } from './'
import { store } from '@/store'

interface INpcItemSaveData {
  itemID: string
  tier: number
  flavorName: string
  description: string
  destroyed: boolean
  charged: boolean
}

class NpcItem {
  private _feature: NpcFeature
  private _tier: number
  private _flavor_name: string
  private _flavor_description: string
  private _destroyed: boolean
  private _charged: boolean

  public constructor(feature: NpcFeature, tier: number) {
    this._feature = feature
    this._tier = tier
    this._flavor_name = this._flavor_description = ''
    this._destroyed = false
    this._charged = true
  }

  private save(): void {
    store.dispatch('npc/saveNpcData')
  }

  public get Feature(): NpcFeature {
    return this._feature
  }

  public get Name(): string {
    return this._flavor_name || this._feature.Name
  }

  public set Name(val: string) {
    this._flavor_name = val
    this.save()
  }

  public get Tier(): number {
    return this._tier
  }

  public set Tier(val: number) {
    this._tier = val
    this.save()
  }

  public get Description(): string {
    return this._flavor_description || ''
  }

  public set Description(val: string) {
    this._flavor_description = val
    this.save()
  }

  public get IsDestroyed(): boolean {
    return this._destroyed
  }

  public set IsDestroyed(val: boolean) {
    this._destroyed = val
  }

  public get IsCharged(): boolean {
    return this._charged
  }

  public set IsCharged(val: boolean) {
    this._charged = val
  }

  public static Serialize(item: NpcItem): INpcItemSaveData {
    return {
      itemID: item._feature.ID,
      tier: item.Tier,
      flavorName: item._flavor_name,
      description: item.Description,
      destroyed: item.IsDestroyed,
      charged: item.IsCharged,
    }
  }

  public static Deserialize(data: INpcItemSaveData): NpcItem {
    const item = new NpcItem(store.getters.referenceByID('NpcFeatures', data.itemID), data.tier)
    item._flavor_description = data.description
    item._flavor_name = data.flavorName
    item._destroyed = data.destroyed
    item._charged = data.charged
    return item
  }
}

export { NpcItem, INpcItemSaveData }

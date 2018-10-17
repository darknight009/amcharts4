/**
 * Defines Percent Chart Series.
 */
import * as tslib_1 from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Series, SeriesDataItem } from "./Series";
import { Sprite } from "../../core/Sprite";
import { Label } from "../../core/elements/Label";
import { Tick } from "../elements/Tick";
import { ListTemplate, ListDisposer } from "../../core/utils/List";
import { Container } from "../../core/Container";
import { ColorSet } from "../../core/utils/ColorSet";
import { registry } from "../../core/Registry";
import * as $iter from "../../core/utils/Iterator";
import * as $ease from "../../core/utils/Ease";
import { Disposer } from "../../core/utils/Disposer";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
//@todo: sequenced?
/**
 * Defines a [[DataItem]] for [[PercentSeries]].
 *
 * @see {@link DataItem}
 */
var PercentSeriesDataItem = /** @class */ (function (_super) {
    tslib_1.__extends(PercentSeriesDataItem, _super);
    /**
     * Constructor
     */
    function PercentSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "PercentSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    /**
     * Adds an `id` attribute the the slice element and returns its id.
     *
     * @ignore Exclude from docs
     */
    PercentSeriesDataItem.prototype.uidAttr = function () {
        return this.slice.uidAttr();
    };
    /**
     * Hide the data item (and corresponding visual elements).
     *
     * @param {number}    duration  Duration (ms)
     * @param {number}    delay     Delay hiding (ms)
     * @param {number}    toValue   Target value for animation
     * @param {string[]}  fields    Fields to animate while hiding
     */
    PercentSeriesDataItem.prototype.hide = function (duration, delay, toValue, fields) {
        if (!fields) {
            fields = ["value"];
        }
        return _super.prototype.hide.call(this, duration, delay, 0, fields);
    };
    /**
     * Show hidden data item (and corresponding cisual elements).
     *
     * @param {number}    duration  Duration (ms)
     * @param {number}    delay     Delay hiding (ms)
     * @param {string[]}  fields    Fields to animate while hiding
     */
    PercentSeriesDataItem.prototype.show = function (duration, delay, fields) {
        if (!fields) {
            fields = ["value"];
        }
        return _super.prototype.show.call(this, duration, delay, fields);
    };
    Object.defineProperty(PercentSeriesDataItem.prototype, "category", {
        /**
         * @return {string} Category
         */
        get: function () {
            return this.properties.category;
        },
        /**
         * Category.
         *
         * @param {string}  value  Category
         */
        set: function (value) {
            this.setProperty("category", value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a marker used in the legend for this slice.
     *
     * @ignore Exclude from docs
     * @param {Container}  marker  Marker container
     */
    PercentSeriesDataItem.prototype.createLegendMarker = function (marker) {
        this.component.createLegendMarker(marker, this);
    };
    Object.defineProperty(PercentSeriesDataItem.prototype, "legendDataItem", {
        /**
         * @return {LegendDataItem<DataItem, IDataItemEvents>} Legend data item
         */
        get: function () {
            return this._legendDataItem;
        },
        /**
         * A legend's data item, that corresponds to this data item.
         *
         * @param {LegendDataItem<DataItem, IDataItemEvents>}  value  Legend data item
         */
        set: function (value) {
            this._legendDataItem = value;
            if (value.label) {
                value.label.dataItem = this;
            }
            if (value.valueLabel) {
                value.valueLabel.dataItem = this;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PercentSeriesDataItem.prototype, "tick", {
        /**
         * A Tick element, related to this data item. (slice)
         *
         * @readonly
         * @return {this["_tick"]} Tick element
         */
        get: function () {
            var _this = this;
            if (!this._tick) {
                var tick_1 = this.component.ticks.create();
                this._tick = tick_1;
                this._disposers.push(tick_1);
                tick_1.parent = this.component.ticksContainer;
                this._disposers.push(new Disposer(function () {
                    _this.component.ticks.removeValue(tick_1);
                }));
                this.addSprite(tick_1);
                tick_1.visible = this.visible;
            }
            return this._tick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PercentSeriesDataItem.prototype, "label", {
        /**
         * A Label element, related to this data item. (slice)
         *
         * @readonly
         * @return {this["_label"]} Label element
         */
        get: function () {
            var _this = this;
            if (!this._label) {
                var label_1 = this.component.labels.create();
                this._label = label_1;
                this._disposers.push(label_1);
                label_1.parent = this.component.labelsContainer;
                this._disposers.push(new Disposer(function () {
                    _this.component.labels.removeValue(label_1);
                }));
                this.addSprite(label_1);
                label_1.visible = this.visible;
            }
            return this._label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PercentSeriesDataItem.prototype, "slice", {
        /**
         * An element, related to this data item. (slice)
         *
         * @readonly
         * @return {Sprite} Slice element
         */
        get: function () {
            var _this = this;
            if (!this._slice) {
                var slice_1 = this.component.slices.create();
                this._slice = slice_1;
                this._disposers.push(slice_1);
                slice_1.parent = this.component.slicesContainer;
                this._disposers.push(new Disposer(function () {
                    _this.component.slices.removeValue(slice_1);
                }));
                this.addSprite(slice_1);
                slice_1.visible = this.visible;
            }
            return this._slice;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PercentSeriesDataItem.prototype, "hiddenInLegend", {
        /**
         * @return {boolean} Disabled in legend?
         */
        get: function () {
            return this.properties.hiddenInLegend;
        },
        /**
         * Should dataItem (slice) be hidden in legend?
         *
         * @param {boolean} value Visible in legend?
         */
        set: function (value) {
            this.setProperty("hiddenInLegend", value);
        },
        enumerable: true,
        configurable: true
    });
    return PercentSeriesDataItem;
}(SeriesDataItem));
export { PercentSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[PercentSeries]] which is a base class for [[PieSeries]],
 * [[FunnelSeries]], and [[PyramidSeries]].
 *
 * @see {@link IPercentSeriesEvents} for a list of available Events
 * @see {@link IPercentSeriesAdapters} for a list of available Adapters
 */
var PercentSeries = /** @class */ (function (_super) {
    tslib_1.__extends(PercentSeries, _super);
    /**
     * Constructor
     */
    function PercentSeries() {
        var _this = _super.call(this) || this;
        _this.className = "PercentSeries";
        _this._addAllDataItems = false;
        _this.alignLabels = false;
        _this.colors = new ColorSet();
        _this.colors.step = 1;
        _this.isMeasured = true;
        _this.calculatePercent = true;
        var slicesContainer = _this.createChild(Container);
        slicesContainer.shouldClone = false;
        slicesContainer.isMeasured = false;
        _this.slicesContainer = slicesContainer;
        var ticksContainer = _this.createChild(Container);
        ticksContainer.shouldClone = false;
        ticksContainer.isMeasured = false;
        ticksContainer.layout = "none";
        _this.ticksContainer = ticksContainer;
        var labelsContainer = _this.createChild(Container);
        labelsContainer.shouldClone = false;
        labelsContainer.isMeasured = false;
        labelsContainer.layout = "none";
        _this.labelsContainer = labelsContainer;
        _this.bulletsContainer.toFront();
        // Make all slices focusable
        _this.skipFocusThreshold = 50;
        var defaultState = _this.defaultState;
        defaultState.transitionEasing = $ease.sinOut;
        // Accessibility
        _this.itemReaderText = "{category}: {value.percent.formatNumber('#.#')}%";
        _this.applyTheme();
        return _this;
    }
    /**
     * Creates a slice element.
     *
     * @return {FunnelSlice} Slice
     */
    PercentSeries.prototype.createSlice = function () {
        return new Sprite();
    };
    /**
     * Creates a tick element.
     *
     * @return {Tick} Tick
     */
    PercentSeries.prototype.createTick = function () {
        return new Tick();
    };
    /**
     * Sreates label element.
     *
     * @return {Label} label
     */
    PercentSeries.prototype.createLabel = function () {
        return new Label();
    };
    Object.defineProperty(PercentSeries.prototype, "slices", {
        get: function () {
            if (!this._slices) {
                var slice = this.createSlice();
                slice.applyOnClones = true;
                this._disposers.push(slice);
                this.initSlice(slice);
                this._slices = new ListTemplate(slice);
                this._disposers.push(new ListDisposer(this._slices));
            }
            return this._slices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PercentSeries.prototype, "ticks", {
        get: function () {
            if (!this._ticks) {
                var tick = this.createTick();
                tick.applyOnClones = true;
                this._disposers.push(tick);
                this.initTick(tick);
                this._ticks = new ListTemplate(tick);
                this._disposers.push(new ListDisposer(this._ticks));
            }
            return this._ticks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PercentSeries.prototype, "labels", {
        get: function () {
            if (!this._labels) {
                var label = this.createLabel();
                label.applyOnClones = true;
                this._disposers.push(label);
                this.initLabel(label);
                this._labels = new ListTemplate(label);
                this._disposers.push(new ListDisposer(this._labels));
            }
            return this._labels;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return {PercentSeriesDataItem} Data Item
     */
    PercentSeries.prototype.createDataItem = function () {
        return new PercentSeriesDataItem();
    };
    /**
     * Creates and returns a new slice element.
     *
     * @param  {typeof Slice}  sliceType  Type of the slice element
     * @return {Slice}                    Slice
     */
    PercentSeries.prototype.initSlice = function (slice) {
    };
    PercentSeries.prototype.initLabel = function (label) {
        label.text = "{category}: {value.percent.formatNumber('#.0')}%";
        label.isMeasured = false;
        label.padding(5, 5, 5, 5);
    };
    PercentSeries.prototype.initTick = function (label) {
    };
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param {PercentSeriesDataItem}  dataItem  Data item
     */
    PercentSeries.prototype.validateDataElement = function (dataItem) {
        var _this = this;
        var slice = dataItem.slice;
        if (slice) {
            // Apply accessibility
            if (this.itemsFocusable()) {
                slice.role = "menuitem";
                slice.focusable = true;
            }
            else {
                slice.role = "listitem";
                slice.focusable = false;
            }
            // Apply screen reader label
            if (slice.focusable) {
                slice.events.once("focus", function (ev) {
                    slice.readerTitle = _this.populateString(_this.itemReaderText, dataItem);
                });
                slice.events.once("blur", function (ev) {
                    slice.readerTitle = "";
                });
            }
            if (slice.hoverable) {
                slice.events.once("over", function (ev) {
                    slice.readerTitle = _this.populateString(_this.itemReaderText, dataItem);
                });
                slice.events.once("out", function (ev) {
                    slice.readerTitle = "";
                });
            }
            if (slice.fill == undefined) {
                slice.fill = this.colors.getIndex(dataItem.index * this.colors.step);
            }
            if (slice.stroke == undefined) {
                slice.stroke = this.colors.getIndex(dataItem.index * this.colors.step);
            }
        }
        // do this at the end, otherwise bullets won't be positioned properly
        _super.prototype.validateDataElement.call(this, dataItem);
    };
    /**
     * Arranges slice labels according to position settings.
     *
     * @ignore Exclude from docs
     * @param {this["_dataItem"][]}  dataItems  Data items
     */
    PercentSeries.prototype.arrangeLabels = function (dataItems) {
        for (var i = 0, len = dataItems.length; i < len; i++) {
            var dataItem = dataItems[i];
            var label = dataItem.label;
            if (label) {
                var nextLabel = this.getNextLabel(i + 1, dataItems);
                if (label.invalid) {
                    label.validate();
                }
                var bottom = label.pixelY + label.measuredHeight;
                if (nextLabel) {
                    if (nextLabel.y < bottom) {
                        nextLabel.y = bottom;
                    }
                }
            }
        }
    };
    /**
     * Returns the next label according to `index`.
     *
     * @param  {number}              index      Current index
     * @param  {PieSerisDataItem[]}  dataItems  Data items
     * @return {AxisLabelCircular}              Label element
     */
    PercentSeries.prototype.getNextLabel = function (index, dataItems) {
        if (dataItems.length >= index) {
            var nextDataItem = dataItems[index];
            if (nextDataItem) {
                if (nextDataItem.label) {
                    return nextDataItem.label;
                }
                else {
                    return this.getNextLabel(index + 1, dataItems);
                }
            }
        }
    };
    Object.defineProperty(PercentSeries.prototype, "colors", {
        /**
         * @return {ColorSet} Color set
         */
        get: function () {
            return this.getPropertyValue("colors");
        },
        /**
         * A color set to be used for slices.
         *
         * For each new subsequent slice, the chart will assign the next color in
         * this set.
         *
         * @param {ColorSet}  value  Color set
         */
        set: function (value) {
            this.setPropertyValue("colors", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Binds related legend data item's visual settings to this series' visual
     * settings.
     *
     * @ignore Exclude from docs
     * @param {Container}          marker    Container
     * @param {this["_dataItem"]}  dataItem  Data item
     */
    PercentSeries.prototype.createLegendMarker = function (marker, dataItem) {
        $iter.each(marker.children.iterator(), function (child) {
            var slice = dataItem.slice;
            // todo: make an easy possibility to bind visual properties
            child.bind("fill", slice);
            child.bind("stroke", slice);
            child.bind("fillOpacity", slice);
            child.bind("strokeOpacity", slice);
            slice.events.on("propertychanged", function (ev) {
                child.defaultState.properties.fill = slice.fill;
                child.defaultState.properties.stroke = slice.stroke;
                child.defaultState.properties.fillOpacity = slice.fillOpacity;
                child.defaultState.properties.strokeOpacity = slice.strokeOpacity;
                if (ev.property == "fill") {
                    if (!child.isActive) {
                        child.fill = slice.fill;
                    }
                }
                if (ev.property == "stroke") {
                    if (!child.isActive) {
                        child.stroke = slice.stroke;
                    }
                }
            });
        });
    };
    /**
     * Repositions bullets when slice's size changes.
     *
     * @ignore Exclude from docs
     * @param {AMEvent<Slice, ISpriteEvents>["propertychanged"]}  event  Event
     */
    PercentSeries.prototype.handleSliceScale = function (event) {
        var _this = this;
        var slice = event.target;
        var dataItem = slice.dataItem;
        $iter.each(dataItem.bullets.iterator(), function (a) {
            var value = a[1];
            _this.positionBullet(value);
        });
    };
    /**
     * Repositions bullet and labels when slice moves.
     *
     * @ignore Exclude from docs
     * @param {AMEvent<Slice, ISpriteEvents>["propertychanged"]}  event  Event
     */
    PercentSeries.prototype.handleSliceMove = function (event) {
    };
    /**
     * Copies all properties from another instance of [[PercentSeries]].
     *
     * @param {ColumnSeries}  source  Source series
     */
    PercentSeries.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.slices.template.copyFrom(source.slices.template);
        this.labels.template.copyFrom(source.labels.template);
        this.ticks.template.copyFrom(source.ticks.template);
    };
    Object.defineProperty(PercentSeries.prototype, "alignLabels", {
        /**
         * @return {boolean} Align labels?
         */
        get: function () {
            return this.getPropertyValue("alignLabels");
        },
        /**
         * Align labels into nice vertical columns?
         *
         * This will ensure that labels never overlap with each other.
         *
         * Arranging labels into columns makes them more readble, and better user
         * experience.
         *
         * If set to `false` labels will be positioned at `label.radius` distance,
         * and may, in some cases, overlap.
         *
         * @default true
         * @param {boolean}  value  Align labels?
         */
        set: function (value) {
            this.setPropertyValue("alignLabels", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return PercentSeries;
}(Series));
export { PercentSeries };
/**
 * bboxter class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["PercentSeries"] = PercentSeries;
registry.registeredClasses["PercentSeriesDataItem"] = PercentSeriesDataItem;
//# sourceMappingURL=PercentSeries.js.map
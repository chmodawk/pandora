/*!
 * Copyright 2019, OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as api from '@opentelemetry/api';
import { Meter, MetricRecord } from '@opentelemetry/metrics';
import { TestBatcher } from './TestBatcher';

/**
 * This class represents a meter provider which platform libraries can extend
 */
export class TestMeterProvider implements api.MeterProvider {
  readonly meters: Map<string, Meter> = new Map();
  readonly logger: api.Logger;
  readonly batcher: TestBatcher;

  constructor() {
    this.batcher = new TestBatcher();
  }

  /**
   * Returns a Meter, creating one if one with the given name and version is not already created
   *
   * @returns Meter A Meter with the given name and version
   */
  getMeter(name: string, version = '*'): Meter {
    const key = `${name}@${version}`;
    if (!this.meters.has(key)) {
      this.meters.set(
        key,
        new Meter({ name, version }, { batcher: this.batcher })
      );
    }

    return this.meters.get(key)!;
  }

  async getMetricRecord(name: string): Promise<MetricRecord> {
    await Promise.all(Array.from(this.meters.values()).map(it => it.collect()));
    return this.batcher
      .checkPointSet()
      .filter(it => it.descriptor.name === name)[0];
  }
}

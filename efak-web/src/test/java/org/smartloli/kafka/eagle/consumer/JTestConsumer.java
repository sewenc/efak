/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.smartloli.kafka.eagle.consumer;

import kafka.admin.ConsumerGroupCommand;
import org.smartloli.kafka.eagle.common.util.CalendarUtils;

/**
 * TODO
 *
 * @author smartloli.
 * <p>
 * Created by Jan 15, 2019
 */
public class JTestConsumer {
    public static void main(String[] args) {
        System.out.println(CalendarUtils.getCustomLastHourUnix(0));
        System.out.println(CalendarUtils.getCustomLastHourUnix(-1));
        ConsumerGroupCommand.main(new String[]{"--bootstrap-server", "127.0.0.1:9092", "--group", "gg0ss0", "--reset-offsets", "--topic", "efak_cluster_003", "--to-earliest", "--execute"});
    }
}
